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

export const UIStateContext = createContext<UIStateContextValue>(
  {} as UIStateContextValue
);

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
  const [showAside, setShowAside] = useState<React.FC | null>(null);
  const [activeModals, setActiveModals] = useState<CurrentModalMap>({});
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

  const toggleAside = useCallback((newAside: React.FC | null) => {
    setShowAside((p: React.FC | null) => (p === newAside ? null : newAside));
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
  asides?: React.FC[];
  modals?: React.FC[];
  customTrayComponent?: React.FC;
}

interface UIStateContextValue {
  asides: React.FC[];
  modals: React.FC[];
  customTrayComponent: React.FC | undefined;
  viewMode: VIEW_MODE;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  closeAside: () => void;
  showParticipantsBar: boolean;
  currentModals: CurrentModalMap;
  toggleAside: (newAside: React.FC | null) => void;
  pinnedId: string | null;
  showAside: React.FC | null;
  setShowAside: React.Dispatch<React.SetStateAction<React.FC | null>>;
  setIsShowingScreenshare: React.Dispatch<React.SetStateAction<boolean>>;
  setPreferredViewMode: React.Dispatch<React.SetStateAction<VIEW_MODE>>;
  setPinnedId: React.Dispatch<React.SetStateAction<string | null>>;
  setShowParticipantsBar: React.Dispatch<React.SetStateAction<boolean>>;
  customCapsule: React.FC | undefined;
  setCustomCapsule: React.Dispatch<React.SetStateAction<React.FC | undefined>>;
  showAutoplayFailedModal: boolean;
  setShowAutoplayFailedModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

type CurrentModalMap = Record<string, boolean>;
