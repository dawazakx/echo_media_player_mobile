import React, { useState, useRef } from "react";

import Video, { SelectedVideoTrackType, SelectedTrackType, SelectedTrack, VideoRef } from "react-native-video";
import { VLCPlayer } from "react-native-vlc-media-player";

import { CustomView } from "./View";
import { CustomText } from "./Text";

export const VideoPlayer = ({ streamUrl }: { streamUrl: string }) => {
  // const [video, setVideo] = useState<VLCPlayer | null>(null);
  const [vlc, setVlc] = useState(false);
  const [videoTrack, setVideoTrack] = useState({type: SelectedVideoTrackType.AUTO, value: ''});
  const [audioTrack, setAudioTrack] = useState({type: SelectedTrackType.SYSTEM, value: ''});
  const [textTrack, setTextTrack] = useState<SelectedTrack>({type: SelectedTrackType.TITLE, value: ''});
  const [metadata, setMetaData] = useState({});

  const videoRef= useRef<VideoRef>(null);
  const vlcVideoRef = useRef<VLCPlayer>(null);

  const playerError = (error: any) => {
    console.log(error)
    if(!vlc && error?.error.errorException.includes('format_supported=NO_UNSUPPORTED_TYPE')) {
      setVlc(true);
    }
  }

  const load = (data: any) => {
    setMetaData(data)
  }

  if(vlc) {
    return (
      <CustomView>
        <VLCPlayer 
          ref={vlcVideoRef} 
          source={{ uri: streamUrl }}
          />
      </CustomView>
    )
  }

  return (
    <CustomView>
      <Video
        ref={videoRef} 
        source={{ uri: streamUrl, initOptions: ['--codec=avcodec'] }}
        onLoad={(data) => load(data)}
        selectedVideoTrack={videoTrack}
        selectedAudioTrack={audioTrack}
        selectedTextTrack={textTrack as SelectedTrack}
        onError={error => playerError(error)}
       />
    </CustomView>
  )
};