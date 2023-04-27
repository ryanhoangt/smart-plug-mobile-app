import DeviceController from './Home/DeviceController';

function DeviceList({ devices }) {
  if (!devices) devices = []
  return devices.map(device => (
    <DeviceController device={device} key={device.id} />
  ));
}

export default DeviceList;
