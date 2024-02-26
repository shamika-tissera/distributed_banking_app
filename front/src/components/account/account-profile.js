import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from 'react';
import { AppConfig } from '../../utils/config';

export const AccountProfile = (props) => {

  // Backend URLs
  const getDetectionImageByNameUrl = AppConfig.baseUrl + AppConfig.detectionImageByNameEndpoint;

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    let arr = [];
    props.pic_file_names.forEach(element => {
      let obj = {
        img: getDetectionImageByNameUrl + element,
        title: element,
      }
      arr.push(obj);
    });
    setItemData(arr);
    console.log(arr);
  }, [props.pic_file_names]);

  return (
    <ImageList sx={{ width: 500, height: 450 }}
      cols={3}
      rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}`}
            srcSet={`${item.img}`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
