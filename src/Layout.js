import { connect } from 'react-redux';
import { Layout } from 'react-admin';

// FIXME LAyout doesn't use the theme anymore...
// const darkTheme = {
//     palette: {
//         type: 'dark', // Switching the dark mode on is a single property value change.
//     },
// };

// export default connect(state => ({
//     theme: state.theme === 'dark' ? darkTheme : {},
// }))(Layout);

export default Layout;
