export interface Bandwidth {
  kbs?: number | 'NO_CAP' | null | undefined;
  trackConstraints?: MediaTrackConstraints | undefined;
}
