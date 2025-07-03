import "./Map.scss";

interface tipe {
  setDifficult: (num: number) => void;
  setShowMap: (boolean: boolean) => void;
  showMap: boolean;
  setShowCity: (boolean: boolean) => void;
}

export default function Map({ setDifficult, setShowMap, showMap, setShowCity }: tipe) {
  return (
    <div>
      {showMap && (
        <div className="map">
          <h2>Куда направимся?</h2>
          <div className="map_all_block">
            <img className="map_img" src="/map/main_map.png" alt="" />
            <div
              onClick={() => (setDifficult(3), setShowMap(false))}
              className="mountain"
            >
              <img className="mark" src="/mark.svg" alt="" />
              <img src="/map/mountain.png" alt="" />
            </div>
            <div
              onClick={() => (setDifficult(2), setShowMap(false))}
              className="forest"
            >
              <img className="mark" src="/mark.svg" alt="" />
              <img src="/map/forest.png" alt="" />
            </div>
            <div
              onClick={() => (setDifficult(1), setShowMap(false))}
              className="lake"
            >
              <img className="mark" src="/mark.svg" alt="" />
              <img src="/map/lake.png" alt="" />
            </div>
            <div
              onClick={() => (setDifficult(0), setShowMap(false), 
        setShowCity(true))}
              className="castle"
            >
              <img className="mark" src="/mark.svg" alt="" />
              <img src="/map/castle.png" alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
