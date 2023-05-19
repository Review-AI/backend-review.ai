import CircularProgressCustom from "./CircularProgressCustom"

export default function Batches(props) {
  let totalReviewsLimit = Math.pow(10, props.totalReviews.toString().length)
  let totalReviewsPercent = ((totalReviewsLimit - props.totalReviews) / totalReviewsLimit ) *100
  
  return (
    <div style={{display:"flex" , width: "483px", justifyContent:"space-evenly"}}>
            <CircularProgressCustom progressPercent = {Math.floor(totalReviewsPercent)}/>
            <CircularProgressCustom progressPercent = {78}/>
            <CircularProgressCustom progressPercent = {10}/>
    </div>
  );
}
