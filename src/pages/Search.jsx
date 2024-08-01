import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import SearchOutput from '../components/SearchOutput';
const Search = () => {
  const params = useParams();

  return (
    <div>
      <Header />
      <SearchOutput input={params.keyword} />
      <Footer />
    </div>
  );
};

export default Search;
