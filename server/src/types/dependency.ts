export interface DependencyEntry {
  name: string;
  version: string;
  parent: string | null;
  depth: number;
}

export interface LockDependencyNode {
  version?: string;
  dependencies?: Record<string, LockDependencyNode>;
}

export interface ParsedLockFile {
  rootName?: string;
  rootVersion?: string;
  dependencies?: Record<string, LockDependencyNode>;
}
