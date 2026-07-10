import type { DependencyEntry, LockDependencyNode, ParsedLockFile } from '../types/dependency';

type ManifestDependencyMap = Record<string, string>;

type ManifestPayload = {
  name?: string;
  version?: string;
  dependencies?: ManifestDependencyMap;
};

const SUPPORTED_FILENAMES = ['package.json', 'package-lock.json'];

const parseJson = (buffer: Buffer | undefined, filename: string) => {
  if (!buffer) {
    throw new Error(`Missing file content for ${filename}`);
  }

  try {
    return JSON.parse(buffer.toString('utf8'));
  } catch {
    throw new Error(`Invalid JSON content in ${filename}`);
  }
};

const parseManifest = (buffer: Buffer | undefined): ManifestPayload => {
  const payload = parseJson(buffer, 'package.json') as ManifestPayload;

  return {
    name: payload.name ?? 'root-package',
    version: payload.version ?? '0.0.0',
    dependencies: payload.dependencies ?? {},
  };
};

const parseLockfile = (buffer: Buffer | undefined): ParsedLockFile => {
  const payload = parseJson(buffer, 'package-lock.json') as {
    name?: string;
    version?: string;
    packages?: Record<string, { name?: string; version?: string }>;
    dependencies?: Record<string, LockDependencyNode>;
  };

  const rootPackage = payload.packages?.[''] ?? {};

  return {
    rootName: rootPackage.name ?? payload.name ?? 'root-package',
    rootVersion: rootPackage.version ?? payload.version ?? '0.0.0',
    dependencies: payload.dependencies ?? {},
  };
};

const buildEntries = (
  rootName: string,
  rootVersion: string,
  manifestDependencies: ManifestDependencyMap,
  lockDependencies: ParsedLockFile['dependencies'],
): DependencyEntry[] => {
  const entries: DependencyEntry[] = [];
  const seen = new Set<string>();

  const addEntry = (name: string, version: string, parent: string | null, depth: number) => {
    const key = `${depth}:${parent ?? 'root'}:${name}`;
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    entries.push({ name, version, parent, depth });
  };

  addEntry(rootName, rootVersion, null, 0);

  const sourceDependencies = Object.entries(manifestDependencies);
  const lockDeps = lockDependencies ?? {};

  for (const [dependencyName, dependencySpec] of sourceDependencies) {
    const resolvedVersion = lockDeps[dependencyName]?.version ?? dependencySpec;
    addEntry(dependencyName, resolvedVersion, rootName, 1);

    const nestedDependencies = lockDeps[dependencyName]?.dependencies ?? {};

    for (const [childName, childSpec] of Object.entries(nestedDependencies)) {
      const childVersion = (childSpec as { version?: string }).version ?? 'unknown';
      addEntry(childName, childVersion, dependencyName, 2);
    }
  }

  return entries;
};

export const parseDependencyFiles = (
  files: Array<{ filename: string; buffer?: Buffer }>,
): DependencyEntry[] => {
  const manifestFile = files.find((file) => file.filename === 'package.json');
  const lockFile = files.find((file) => file.filename === 'package-lock.json');

  if (!manifestFile && !lockFile) {
    throw new Error(`Please upload at least one of: ${SUPPORTED_FILENAMES.join(', ')}`);
  }

  const manifest = manifestFile ? parseManifest(manifestFile.buffer) : null;
  const lockfile = lockFile ? parseLockfile(lockFile.buffer) : null;

  const rootName = manifest?.name ?? lockfile?.rootName ?? 'root-package';
  const rootVersion = manifest?.version ?? lockfile?.rootVersion ?? '0.0.0';
  const manifestDependencies = manifest?.dependencies ?? {};
  const lockDependencies = lockfile?.dependencies ?? {};

  return buildEntries(rootName, rootVersion, manifestDependencies, lockDependencies);
};
