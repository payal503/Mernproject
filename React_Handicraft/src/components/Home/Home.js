import React, { useEffect } from 'react'
import Header from '../header/Header'
import Navigation from '../navigation/Navigation'
import Search from '../search/SearchModal'
import Banner from '../banner/Banner'
import Category from '../category/Category'
import FeatureProducts from '../featuresProduct/FeatureProducts'
import Footer from '../footer/Footer'
import { useDispatch } from 'react-redux'
import { fetchCategory } from '../../redux-config/CategorySlice'
import { fetchFeatureProduct } from '../../redux-config/FeaturesProductSlice'
export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchFeatureProduct())
  }, [])

  return <>
    <Header />
    <Navigation />
    <Search />
    <Banner />
    <Category />
    <FeatureProducts />
    <Footer />
  </>
}
