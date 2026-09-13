import BestSeller from "../Components/BestSeller"
import BottonBanner from "../Components/BottonBanner"
import Categories from "../Components/Categories"
import MainPart from "../Components/MainPart"
import NewsLetter from "../Components/NewsLetter"

const Home = () => {
  return (
    <div className="mt-10 ">
        <MainPart/>
        <Categories/>
        <BestSeller/>
        <BottonBanner/>
        <NewsLetter/>
    </div>
  )
}
export default Home