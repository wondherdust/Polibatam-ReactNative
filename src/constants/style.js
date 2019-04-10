import {
  StyleSheet
} from 'react-native';

export const primaryColor = '#204169';
export const secondaryColor = '#ade7f7';
export const accentColor = '#df7825';

export const styles = StyleSheet.create({
  headerStyle: {
    fontWeight: '100'
  },
  container: {
    padding: 8,
    backgroundColor: 'white'
  },
  card: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 8
  },
  loginForm: {
    borderWidth: 1,
    borderColor: primaryColor,
    color: primaryColor,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8
  },
  errorMsg: {
    color: 'red',
    fontStyle: 'italic'
  },
  containerBtn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: primaryColor,
    borderRadius: 8
  },
  textBtn: {
    color: accentColor,
    fontWeight: '100',
    fontSize: 16
  },
  profileContainer: {
    width: '100%',
    height: 200,
    backgroundColor: primaryColor,
    padding: 16,
    justifyContent: 'flex-end'
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileName: {
    color: 'white',
    marginTop: 16,
    fontSize: 24
  },
  announcementTitle: {
    fontSize: 24,
    color: accentColor,
    marginBottom: 8
  },
  renderCondition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    color: accentColor
  },
  description: {
    color: 'black',
    marginTop: 16,
    fontSize: 18
  },
  eventForm: {
    borderWidth: 1,
    borderColor: primaryColor,
    color: primaryColor,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
    marginVertical: 8
  }
});
