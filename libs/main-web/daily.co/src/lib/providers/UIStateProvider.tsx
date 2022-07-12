import React, {
  useCallback,
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import { useDeepCompareMemo } from 'use-deep-compare';
// enums
import { VIEW_MODE } from '../enums';

export const UIStateContext = createContext({});

export const UIStateProvider: React.FC<
  PropsWithChildren<UIStateProviderProps>
> = ({ asides = [], modals = [], customTrayComponent, children }) => {
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [preferredViewMode, setPreferredViewMode] = useState<VIEW_MODE>(
    VIEW_MODE.SPEAKER
  );
  const [viewMode, setViewMode] = useState<VIEW_MODE>(preferredViewMode);
  const [isShowingScreenshare, setIsShowingScreenshare] =
    useState<boolean>(false);
  const [showParticipantsBar, setShowParticipantsBar] = useState<boolean>(true);
  const [showAside, setShowAside] = useState<unknown>();
  const [activeModals, setActiveModals] = useState<Record<string, boolean>>({});
  const [customCapsule, setCustomCapsule] = useState<React.FC>();
  const [showAutoplayFailedModal, setShowAutoplayFailedModal] =
    useState<boolean>(false);

  /**
   * Decide on view mode based on input conditions.
   */
  useEffect(() => {
    if (isMobile) {
      setViewMode(VIEW_MODE.MOBILE);
    } else if (pinnedId || isShowingScreenshare) {
      setViewMode(VIEW_MODE.SPEAKER);
    } else {
      setViewMode(preferredViewMode);
    }
  }, [pinnedId, isMobile, isShowingScreenshare, preferredViewMode]);

  const openModal = useCallback((modalName: string) => {
    setActiveModals((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  }, []);

  const closeModal = useCallback((modalName: string) => {
    if (!modalName) {
      setActiveModals({});
    }

    setActiveModals((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  }, []);

  const currentModals = useDeepCompareMemo(() => activeModals, [activeModals]);

  const toggleAside = useCallback((newAside: React.FC) => {
    setShowAside((p: React.FC) => (p === newAside ? null : newAside));
  }, []);

  const closeAside = useCallback(() => {
    setShowAside(null);
  }, []);

  useEffect(() => {
    if (pinnedId || isShowingScreenshare) {
      setViewMode(VIEW_MODE.SPEAKER);
    } else {
      setViewMode(preferredViewMode);
    }
  }, [isShowingScreenshare, pinnedId, preferredViewMode]);

  return (
    <UIStateContext.Provider
      value={{
        asides,
        modals,
        customTrayComponent,
        viewMode,
        openModal,
        closeModal,
        closeAside,
        showParticipantsBar,
        currentModals,
        toggleAside,
        pinnedId,
        showAside,
        setShowAside,
        setIsShowingScreenshare,
        setPreferredViewMode,
        setPinnedId,
        setShowParticipantsBar,
        customCapsule,
        setCustomCapsule,
        showAutoplayFailedModal,
        setShowAutoplayFailedModal,
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

export const useUIState = () => useContext(UIStateContext);

interface UIStateProviderProps {
  asides: React.FC[];
  modals: React.FC[];
  customTrayComponent: React.ReactNode;
}
