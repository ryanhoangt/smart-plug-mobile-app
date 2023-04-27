import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import useFetch from '../../hooks/useFetchData';
import { AuthContext } from '../../store/auth-context';
import { getAutomation } from '../../services/automation.service';
import LoadingOverlay from '../../components/UI/LoadingOverlay';

function DetailAutomationScreen({ route }) {
  const { id } = route.params;
  const { token } = useContext(AuthContext);
  const [automation, loading, err, fetchData] = useFetch(async () => {
    return await getAutomation(id, token);
  });

  if (loading) return <LoadingOverlay message="Loading detail automation" />;
  return <Text>{automation.name}</Text>;
}

export default DetailAutomationScreen;
