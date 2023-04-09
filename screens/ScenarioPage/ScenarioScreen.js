import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import ScenarioButton from '../../components/UI/ScenarioButton';
import Header from '../../components/UI/Header';
import { defaultStyles } from '../../constants/defaultStyle';
import AddNewButton from '../../components/UI/AddNewButton';
import { useContext, useState } from 'react';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import { UserDataContext } from '../../store/user-data-context';
import { getAllScenarios } from '../../services/user-data.service';

function ScenarioScreen({ navigation }) {
  function handleAddScenario() {
    navigation.navigate('New Scenario');
  }

  const fetchAllScenarios = async () => {
    setIsLoading(true);

    try {
      const scenariosArr = await getAllScenarios(userDataCtx.id);
      userDataCtx.updateAllScenarios(scenariosArr);
    } catch (err) {
      // TODO: handle error
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  function onScrollHandler(event) {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY < -12) {
      fetchAllScenarios();
    }
  }

  const userDataCtx = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <LoadingOverlay message="Loading..." />;

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
        {userDataCtx.allScenarios.map((scenarioObj) => {
          return (
            <ScenarioButton text={scenarioObj.name} key={scenarioObj._id} />
          );
        })}
        <AddNewButton
          onBtnPress={handleAddScenario}
          btnText="Add New Scenarios"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scenarioList: {
    // marginTop: 12,
    // backgroundColor: "red",
    // flex: 1,
  },
});

export default ScenarioScreen;
