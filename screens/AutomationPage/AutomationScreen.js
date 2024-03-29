import { StatusBar } from 'expo-status-bar';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { defaultStyles } from '../../constants/defaultStyle';
import { useContext } from 'react';
import AddNewButton from '../../components/UI/AddNewButton';
import { AuthContext } from '../../store/auth-context';
import { getAllAutomations } from '../../services/automation.service';
import AutomationList from './components/AutomationList';
import useFetch from '../../hooks/useFetchData';
import { createInstance } from '../../services/axios.service';

function AutomationScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [data, loading, error, fetchData] = useFetch(async () => {
    const instance = createInstance(token);
    return await getAllAutomations(instance);
  });

  function handleAddAutomation() {
    navigation.navigate('New Automation');
  }

  function gotoDetailPage(id) {
    navigation.navigate('Detail Automation', { id });
  }

  return (
    <SafeAreaView
      style={defaultStyles.container}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar style="auto" />
      <ScrollView
        style={styles.scenarioList}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchData} />
        }
      >
        <AutomationList onElementPress={gotoDetailPage} automations={data} />
        <AddNewButton
          btnText="Add New Automation"
          onBtnPress={handleAddAutomation}
        />
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
