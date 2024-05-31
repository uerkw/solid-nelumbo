import { Upload } from "@aws-sdk/lib-storage";
import { createEffect, createSignal } from "solid-js";

interface ProgressBarProps {
 upload: Upload
}

export const ProgressBar = (props: ProgressBarProps) => {
    const [curProgress, setProgress] = createSignal(0);
  
    createEffect(() => {
      const progressListener = (progress) => {
        const progressPercentage = Math.round(progress.loaded / progress.total * 100);
        setProgress(progressPercentage);
      };
  
      props.upload.on('httpUploadProgress', progressListener);
  
      return () => {
        props.upload.off('httpUploadProgress', progressListener);
      };
    }, [props.upload]);
  
    return (
      <div style={{ width: '100%', height: '20px', backgroundColor: '#ddd' }}>
        <div
          style={{
            width: `${curProgress}%`,
            height: '100%',
            backgroundColor: '#4CAF50',
          }}
        />
      </div>
    );
  };