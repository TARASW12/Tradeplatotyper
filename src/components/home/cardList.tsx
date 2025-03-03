import {FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import {Card} from '../card/card.tsx';
import {Indicator} from './indicator.tsx';
import React, {useCallback, useRef, useState} from 'react';

export const CardList = ({
  cardsData,
  setActiveCard,
  hideIndicator,
  refetchCards,
  hideDelete,
  refetch,
}) => {
  const {width} = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const CARD_WIDTH = width - 50;
  const CARD_MARGIN = 10;
  const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_MARGIN * 2;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // At least 50% of the item must be visible
  };

  const onViewableItemsChanged = useCallback(
    ({viewableItems}) => {
      if (viewableItems.length > 0 && cardsData.length > 0) {
        const firstVisibleItem = viewableItems[0].item;
        setActiveCard?.(firstVisibleItem);
      }
    },
    [cardsData, setActiveCard, refetch],
  );

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / CARD_TOTAL_WIDTH);
    setActiveIndex(index);
  };
  return (
    <>
      <FlatList
        data={cardsData}
        horizontal={true}
        renderItem={({item, index}) => (
          <Card
            hideDelete={hideDelete}
            refetchCards={refetchCards}
            item={{...item, index}}
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_TOTAL_WIDTH}
        snapToAlignment="center"
        contentContainerStyle={styles.flatListContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        extraData={cardsData}
      />
      {!hideIndicator && (
        <Indicator count={cardsData.length} activeIndex={activeIndex} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
});
