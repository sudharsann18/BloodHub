import { Alert, Linking, Platform } from 'react-native';

const getPhoneUrl = (phone) => {
  const normalizedPhone = String(phone || '').replace(/[^\d+]/g, '');
  return normalizedPhone.length >= 3 ? `tel:${normalizedPhone}` : null;
};

export async function openPhoneDialer(phone, label = 'Contact') {
  const phoneUrl = getPhoneUrl(phone);

  if (!phoneUrl) {
    Alert.alert(`${label} unavailable`, `No valid ${label.toLowerCase()} number is available.`);
    return false;
  }

  try {
    if (!(await Linking.canOpenURL(phoneUrl))) {
      throw new Error('Phone dialer is unavailable');
    }

    await Linking.openURL(phoneUrl);
    return true;
  } catch {
    Alert.alert('Unable to call', 'This device cannot open the phone dialer.');
    return false;
  }
}

export async function openMapLocation({ latitude, longitude, address, label = 'Location' }) {
  const hasCoordinates = Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude));
  const query = hasCoordinates
    ? `${Number(latitude)},${Number(longitude)}`
    : String(address || '').trim();

  if (!query) {
    Alert.alert(`${label} unavailable`, 'No location information is available.');
    return false;
  }

  const encodedQuery = encodeURIComponent(query);
  const googleMapsUrl = Platform.OS === 'android'
    ? `comgooglemaps://?query=${encodedQuery}`
    : `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;

  try {
    if (await Linking.canOpenURL(googleMapsUrl)) {
      await Linking.openURL(googleMapsUrl);
      return true;
    }

    if (await Linking.canOpenURL(fallbackUrl)) {
      await Linking.openURL(fallbackUrl);
      return true;
    }
  } catch {
    // Fall through to the user-facing error below.
  }

  Alert.alert('Unable to open maps', 'No maps application is available on this device.');
  return false;
}