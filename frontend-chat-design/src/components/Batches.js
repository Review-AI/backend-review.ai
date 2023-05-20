import CircularProgressCustom from "./CircularProgressCustom"

export default function Batches(props) {
  let totalReviewsLimit = Math.pow(10, props.totalReviews.toString().length)
  let totalReviewsPercent = ((totalReviewsLimit - props.totalReviews) / totalReviewsLimit ) *100
  let totalReviews = props.totalReviews
  if (totalReviews >= 100000)
    totalReviews = Math.ceil(totalReviews/100000).toString() + "L"
  else if (totalReviews >= 1000)
    totalReviews = Math.ceil(totalReviews/1000).toString() + "K"

  return (
    <div style={{display:"flex" , width: "483px", justifyContent:"space-evenly"}}>
            <CircularProgressCustom 
              progressPercent = {Math.floor(totalReviewsPercent)} 
              progressTitle={"Total Reviews"}
              progressBarTitle={totalReviews}
            />
            <CircularProgressCustom 
              progressPercent = {parseInt(props.productLikeness)} 
              progressTitle={"Product Likeness"}
              progressBarTitle={parseInt(props.productLikeness).toString() + "%"}
            />
            <CircularProgressCustom 
              progressPercent = {parseInt(props.productComplaint)} 
              progressTitle={"Product Complaints"}
              progressBarTitle={parseInt(props.productComplaint).toString() + "%"}
            />
    </div>
  );
}
