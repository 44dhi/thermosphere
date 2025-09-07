import { MapPin, MonitorSmartphone, Thermometer, Users, Wifi } from 'lucide-react-native';

export const settings = [
  {
    title: 'General',
    children: [
      {
        title: 'Device Management',
        icon: <MonitorSmartphone color="white" />,
      },
      {
        title: 'Connectivity',
        icon: <Wifi color="white" />,
      },
      {
        title: 'Family Members',
        icon: <Users color="white" />,
      },
    ],
  },
  {
    title: 'Preferences',
    children: [
      {
        title: 'Temperature Unit',
        icon: <Thermometer color="white" />,
      },
      {
        title: 'Location Services',
        icon: <MapPin color="white" />,
      },
    ],
  },
];
