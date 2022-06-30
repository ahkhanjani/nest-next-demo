import React, { useState, useMemo, useEffect, useRef } from 'react';
// cmp
import Tile from '../../shared/components/Tile';
// constants
import { DEFAULT_ASPECT_RATIO } from '../../shared/constants';
// providers
import { useParticipants } from '../../shared/contexts/ParticipantsProvider';
// hooks
import { useDeepCompareMemo } from 'use-deep-compare';
// styles
import styles from './VideoGrid.module.scss';

/**
 * Basic unpaginated video tile grid, scaled by aspect ratio
 *
 * Note: this component is designed to work with automated track subscriptions
 * and is only suitable for small call sizes as it will show all participants
 * and not paginate.
 *
 * Note: this grid does not show screenshares (just participant cams)
 *
 * Note: this grid does not sort participants
 */
const VideoGrid = React.memo(
  () => {
    const containerRef = useRef<HTMLDivElement>();
    const { participants } = useParticipants();
    const [dimensions, setDimensions] = useState<Dimensions>({
      width: 1,
      height: 1,
    });

    // Keep a reference to the width and height of the page, so we can repack
    useEffect(() => {
      let frame: number;
      const handleResize = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() =>
          setDimensions({
            width: containerRef.current?.clientWidth,
            height: containerRef.current?.clientHeight,
          })
        );
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    }, []);

    // Basic brute-force packing algo
    const layout = useMemo(() => {
      const aspectRatio = DEFAULT_ASPECT_RATIO;
      const tileCount = participants.length || 0;
      const w = dimensions.width;
      const h = dimensions.height;

      // brute-force search layout where video occupy the largest area of the container
      let bestLayout = {
        area: 0,
        cols: 0,
        rows: 0,
        width: 0,
        height: 0,
      };

      for (let cols = 0; cols <= tileCount; cols += 1) {
        const rows = Math.ceil(tileCount / cols);
        const hScale = w / (cols * aspectRatio);
        const vScale = h / rows;
        let width;
        let height;
        if (hScale <= vScale) {
          width = Math.floor(w / cols);
          height = Math.floor(width / aspectRatio);
        } else {
          height = Math.floor(h / rows);
          width = Math.floor(height * aspectRatio);
        }
        const area = width * height;
        if (area > bestLayout.area) {
          bestLayout = {
            area,
            width,
            height,
            rows,
            cols,
          };
        }
      }

      return bestLayout;
    }, [dimensions, participants]);

    // Memoize our tile list to avoid unnecessary re-renders
    const tiles = useDeepCompareMemo(
      () =>
        participants.map((p) => (
          <Tile
            participant={p}
            key={p.id}
            mirrored
            style={{ maxWidth: layout.width, maxHeight: layout.height }}
          />
        )),
      [layout, participants]
    );

    if (!participants.length) {
      return null;
    }

    // ─────────────────────────────────────────────────────────────────

    return (
      <div className={styles['video-grid']} ref={containerRef}>
        <div className={styles['tiles']}>{tiles}</div>
      </div>
    );
  },
  () => true
);
export default VideoGrid;

interface Dimensions {
  width?: number;
  height?: number;
}
