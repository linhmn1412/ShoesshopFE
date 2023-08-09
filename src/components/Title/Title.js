const Title = ({content}) => {
  return (
    <div className="container " style={{marginTop : "90px"}}>
 
      <div className="card mb-3 shadow-5" >
    <div className="card-body " >
      <center>
        <h3 className="card-title primary-text text-uppercase" >
          {content}
        </h3>
      </center>
    </div>
  </div>
      </div>
    
  );
};

export default Title;
