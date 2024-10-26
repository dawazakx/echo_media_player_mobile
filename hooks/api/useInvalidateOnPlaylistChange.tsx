import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { PlaylistContext } from "@/providers/PlaylistProvider";

const useInvalidateOnPlaylistChange = () => {
  const queryClient = useQueryClient();
  const { activePlaylist, isPlaylistChanging } = useContext(PlaylistContext);

  useEffect(() => {
    if (isPlaylistChanging) {
      queryClient.invalidateQueries();
    }
  }, [isPlaylistChanging, queryClient]);
};

export default useInvalidateOnPlaylistChange;
