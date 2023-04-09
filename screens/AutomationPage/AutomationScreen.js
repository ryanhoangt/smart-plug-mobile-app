import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import ScenarioButton from '../../components/UI/ScenarioButton';
import Header from '../../components/UI/Header';
import { defaultStyles } from '../../constants/defaultStyle';
import { useContext, useEffect, useState } from 'react';
import AddNewButton from '../../components/UI/AddNewButton';
import { BACKEND_HOST } from '@env';
import { UserDataContext } from '../../store/user-data-context';
import axios from 'axios';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import Automation from '../../model/automation';
import { getAllAutomations } from '../../services/user-data.service';

function AutomationScreen({ navigation }) {
  // var [count, setCount] = useState(0);

  const userDataCtx = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAutomations = async () => {
    setIsLoading(true);

    try {
      const autosArr = await getAllAutomations(userDataCtx.id);
      userDataCtx.updateAllAutomations(autosArr);
    } catch (err) {
      // TODO: handle error...
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAutomations();
  }, []);

  function handleAddAutomation() {
    navigation.navigate('New Automation');
  }

  function onPress() {
    // setCount(count+1)
    navigation.navigate('Detail Automation');
  }

  function onScrollHandler(event) {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY < -12) {
      fetchAutomations();
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <SafeAreaView
      style={defaultStyles.container}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar style="auto" />
      <ScrollView
        style={styles.scenarioList}
        onScroll={onScrollHandler}
        scrollEventThrottle={500}
      >
        {userDataCtx.allAutomations.map((autoObj) => {
          return (
            <ScenarioButton
              onPress={onPress}
              text={autoObj.name}
              key={autoObj._id}
            />
          );
        })}
        <AddNewButton
          btnText="Add New Automation"
          onBtnPress={handleAddAutomation}
        />
        {/* <View style={styles.addBtn}>
          <Button
            onPress={handleAddAutomation}
            color={Colors.grayPrimary}
            title="+ Add new Automation"
            accessibilityLabel="Add new Automation"
          />
        </View> */}
        {/* <Text>Count: {count}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scenarioList: {
    // marginTop: 12,
    // backgroundColor: "red",
    // flex: 1
  },
  addBtn: {
    marginTop: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: Colors.grayPrimary,
    borderRadius: 6,
  },
});

export default AutomationScreen;
