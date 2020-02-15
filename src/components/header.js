import { Link } from "gatsby"
import React from "react"
import styled from 'styled-components'
import { FaBars, FaTimes } from 'react-icons/fa'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Logo from "../assets/logo_fresh_sansation_horizontal_white.inline.svg"

export default class Header extends React.Component {
  state = {
    showMenu: false,
  }

  componentDidMount = () => {
    this.setState({ showMenu: false });
  }

  handleClick = (e, index) => {
    e.preventDefault()
    this.setState({ showMenu: !this.state.showMenu });
    disableBodyScroll(this.targetElement);
  };

  closeModal = () => {
    this.setState({ showMenu: false })
    enableBodyScroll(this.targetElement);
  }

  render() {
    return (
      <header>
        <HeaderStyle>
          <MobileStyle>
            <FaBars onClick={this.handleClick} style={{ position: "absolute", top: "5vh", left: "-10px", width: "12vw", minWidth: "40px"  }} />
            <DropdownMenu visible={this.state.showMenu}>
              <StyledLink onClick={this.closeModal} to="/about_us"> About Us</StyledLink>
              <StyledLink onClick={this.closeModal} to="/events"> Events</StyledLink>
              <StyledLink onClick={this.closeModal} to="/find_us"> Find US</StyledLink>
              <StyledLink onClick={this.closeModal} to="/groups"> Join Us</StyledLink>
              <StyledLink onClick={this.closeModal} to="volunteer_with_us"> Volunteer</StyledLink>
              <StyledLink onClick={this.closeModal} to="/donate"> Donate</StyledLink>

              <FaTimes onClick={this.closeModal} style={{ fontSize: "1.5em" }} />
            </DropdownMenu>
          </MobileStyle>
          <TitleStyle>
            <StyledLink to="/about_us/">
              About Us
            </StyledLink>
            <StyledLink to="/events/">
              What's On
            </StyledLink>
            <StyledLink to="/groups">
              Regular Groups
            </StyledLink>
          </TitleStyle>
          <StyledLink>
            <Link to="/"><StyledLogo/> </Link>
          </StyledLink>
          <TitleStyle>
            <StyledLink to="/find_us/">Services For Hire</StyledLink>
            <StyledLink to="volunteer_with_us">Donate</StyledLink>
            <StyledLink to="/donate/">Donate</StyledLink>
          </TitleStyle>
        </HeaderStyle>
      </header>
    )
  }
}

const HeaderStyle = styled.div`
  height: 150px;
  display: flex;
  overflow: hidden;
  background: #3B8BEB;
  flex-direction: row;
  min-width: 300px;
`

const StyledLogo = styled(props => <Logo {...props} />)`
  max-width: 80%;
  height: auto;
  max-height: 100%;
  vertical-align: center;
  @media (max-width: 950px) {
    float: right;
    width: 70vw;
    min-width: 200px
  }

`

const StyledLink = styled(props => <Link {...props} />)`
  color: white;
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 1.5vw;
  @media (max-width: 1500px) {
    font-size: 1.4vw;
  }
    &:hover {
      color: black;
    }
`;

const TitleStyle = styled.div`
  position: relative;
  min-height: 150px;
  width: calc(100% / 2);  
  display: inline-block;
  vertical-align: bottom;   
  text-align:center;
  padding-top: 70px;
  margin:20px;    
  @media (max-width: 950px) {
    display: none;
  }
  `

const MobileStyle = styled.div`
  font-size: 3em;
  color: white;
  position: absolute;
  text-align: center;
  margin: 10px;
  border-radius: 20px;
  width 70px;
  height: 70px;
  left: 30px;
  @media (min-width: 950px) {
    display: none;
  }
  `
const DropdownMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  font-size: 1em;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #3B8BEB;
  z-index: 1000;
  height: auto;
  transition: height 2s ease;
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`