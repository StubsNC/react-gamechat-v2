import React from 'react';
import  {homeObjOne, homeObjTwo, homeObjThree} from './InfoSection/Data';
import  Navbar from './Navbar/Navbar';
import  InfoSection  from './InfoSection/InfoSection'
import  Pricing  from './Pricing/Pricing'; 
import  Footer  from './Footer/Footer';
import GlobalStyle from './globalStyles';
import ScrollToTop from './ScrollToTop';


function HomePage() {
  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
      <Navbar />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjThree} />
      <Pricing />
      <Footer />
    </>
  )
}

export default HomePage;
