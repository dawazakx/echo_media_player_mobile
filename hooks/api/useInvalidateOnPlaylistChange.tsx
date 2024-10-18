import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { PlaylistContext } from "@/providers/PlaylistProvider";

const useInvalidateOnPlaylistChange = () => {
  const queryClient = useQueryClient();
  const { activePlaylist } = useContext(PlaylistContext);

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [activePlaylist, queryClient]);
};

export default useInvalidateOnPlaylistChange;
