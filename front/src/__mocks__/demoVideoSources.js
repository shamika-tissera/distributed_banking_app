import { v4 as uuid } from 'uuid';

export const demoVideoSources = [
  {
    id: uuid(),    
    media: 'http://127.0.0.1:5000/video_demo/1',
    cameraId: '1'
  },
  {
    id: uuid(),
    media: 'http://127.0.0.1:5000/video_demo/2',
    cameraId: '2'
  },
  {
    id: uuid(),
    media: 'http://127.0.0.1:5000/video_demo/3',
    cameraId: '3'
  }
];
