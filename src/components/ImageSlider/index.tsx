import React from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles'

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export const ImageSlider = ({imagesUrl}: Props) => {
  const [imageIndex, setImageIndex] = React.useState(0);

  const indexChanges = React.useRef((info: ChangeImageProps) => {
    setImageIndex(Number(info.viewableItems[0].index));
  })

  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrl.map((_ ,index) => (
            <ImageIndex
              key={index}
              active={index === imageIndex}
            />
          ))
        }
      </ImageIndexes>
        <FlatList
          data={imagesUrl}
          keyExtractor={key => key}
          renderItem={({item}) => (
            <CarImageWrapper>
              <CarImage 
                source={{uri: item}}
                resizeMode='contain'
              />
            </CarImageWrapper>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanges.current}
        />
    </Container>
  );
}