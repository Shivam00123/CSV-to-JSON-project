import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { nextStep } from "../redux/action";

const Sample = ({ data }) => {
  const [mappedList, setMappedList] = useState(data);
  const [desiredColumn, setDesiredColumn] = useState(0);
  const dispatch = useDispatch();

  const Desireinput = {
    width: "190px",
    height: "30px",
    fontSize: "0.8rem",
  };

  useEffect(() => {
    function rotateArr(arr, start, end) {
      const mappedList = [];
      for (let i = start; i <= end; i++) {
        if (i === end) {
          mappedList.push(arr[i]);
          for (let j = 0; j <= start - 1; j++) {
            mappedList.push(arr[j]);
          }
        } else {
          if (arr[i]) {
            mappedList.push(arr[i]);
          }
        }
      }
      setMappedList(mappedList);
    }
    if (desiredColumn) {
      if (desiredColumn <= mappedList.length) {
        rotateArr(data, desiredColumn - 1, mappedList.length - 1);
      } else {
        alert(`No value found in column ${desiredColumn}`);
      }
    }
  }, [desiredColumn]);

  return (
    <div>
      <div>
        <h4>Map with Specific column</h4>
        <input
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              setDesiredColumn(event.target.value);
            }
          }}
          id="input"
          style={Desireinput}
          type="number"
          placeholder="specific column"
          max={mappedList.length - 1}
          min="0"
        />
      </div>
      <div>
        {mappedList &&
          mappedList.map((item, index) => <h3 key={index}>{item}</h3>)}
      </div>
      <section>
        <button
          className="styleButton"
          onClick={() => dispatch(nextStep(3, mappedList))}
        >
          Download
        </button>
      </section>
    </div>
  );
};

function mapStateToProps({ data }) {
  return {
    data,
  };
}

export default connect(mapStateToProps)(Sample);
