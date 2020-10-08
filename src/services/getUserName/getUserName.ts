/**
 * fake user name fetching
 */
export function getUserName(): Promise<string> {
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve('Anton'), 1000)
  );
}
