import { connect } from 'react-redux';

import { reserveSpot } from '../actions';
import Header from '../components/Header';

const mapStateToProps = ({ web3 }) => ({ web3 });

const HeaderContainer = connect(mapStateToProps, { reserveSpot })(Header);

export default HeaderContainer;
