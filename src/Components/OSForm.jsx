import React from "react";
import { useEffect, useState } from "react";

const OSForm = () => {
  const [algorithm, setAlgorithm] = useState("");
  const [arrayString, setArrayString] = useState("");
  const [array, setArray] = useState([]);
  const [search, setSearch] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [position, setPosition] = useState();
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [highlightedIndexes, setHighlightedIndexes] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);

  useEffect(() => {
    if (algorithm === "LS" && buttonPressed) {
      LinearSearch();
    } else if (algorithm === "BS" && buttonPressed) {
      BinarySearch();
    } else if (algorithm === "BBS" && buttonPressed) {
      BubbleSort();
    } else if (algorithm === "SS" && buttonPressed) {
      SelectionSort();
    }
  }, [buttonPressed]);

  const handleSubmit = async () => {
    setButtonPressed(true);
    let tempArray = arrayString.split(",").map(function (item) {
      return parseInt(item, 10);
    });
    setArray(tempArray);
  };

  const LinearSearch = async () => {
    for (let i = 0; i < array.length; i++) {
      setHighlightedIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (search === array[i]) {
        setPosition(i + 1);
        setHighlightedIndex(null);
        return;
      }
    }
    setPosition(0); // If not found, set position to 0
    setHighlightedIndex(null); // Clear highlight
  };

  const BinarySearch = async () => {
    array.sort(function (a, b) {
      return a - b;
    });
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      setHighlightedIndex(mid);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (array[mid] === search) {
        setPosition(mid + 1);
        setHighlightedIndex(null);
        return;
      } else if (array[mid] < search) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    setPosition(0);
    setHighlightedIndex(null);
  };

  const BubbleSort = async () => {
    let arr = [...array];
    let n = arr.length;
    console.log(n, "is n");
    do {
      for (let i = 0; i < n - 1; i++) {
        setHighlightedIndexes([i, i + 1]);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
        console.log("Now comparing", arr[i], "and", arr[i + 1]);
        if (arr[i] > arr[i + 1]) {
          console.log(arr[i], "is bigger than", arr[i + 1]);
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          setArray([...arr]);
        }
      }
      n--;
    } while (n > 1);
  };

  const SelectionSort = async () => {
    for (let i = 0; i < array.length; i++) {
      if (array[0] > array[i]) {
        let min = array[i];
        console.log(min);
      }
    }
  };

  return (
    <>
      <div className="bg-slate-800 pt-5 min-h-screen max-h-full">
        <div className="w-1/2 flex mx-auto ">
          <form
            // onSubmit={handleSubmit}
            className="new-item-form"
          >
            <div className="form-row">
              <div class="mb-6">
                <div class="grid grid-cols-4 gap-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-auto">
                    Choose Algorithm:
                  </label>
                  <select
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={algorithm}
                    onChange={(e) => {
                      setAlgorithm(e.target.value);
                    }}
                  >
                    <option selected>Choose an algorithm</option>
                    <option value="LS">Linear Search</option>
                    <option value="BS">Binary Search</option>
                    <option value="BBS">Bubble Sort</option>
                    <option value="SS">Selection Sort</option>
                  </select>
                  <input
                    type="text"
                    id="processes"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Array"
                    value={arrayString}
                    onChange={(e) => setArrayString(e.target.value)}
                    required
                  />
                  {(algorithm == "LS" || algorithm == "BS") && (
                    <input
                      type="text"
                      id="processes"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search for"
                      value={search}
                      onChange={(e) => setSearch(Number(e.target.value))}
                      // onKeyDown={handleKeyDown}
                      required
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                // onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>

            {/* <div className="text-right mt-5">
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                // onClick={() => {
                //   handleAlgorithm();
                // }}
              >
                Generate
              </button>
            </div> */}

            <div className="flex flex-row mt-10 h-10">
              {buttonPressed &&
                array.length > 0 &&
                array.map((term, index) => (
                  <div
                    key={index}
                    className={`${
                      index === position - 1
                        ? "bg-green-500"
                        : index === highlightedIndex ||
                          highlightedIndexes.includes(index)
                        ? "bg-blue-500"
                        : index % 2 === 0
                        ? "bg-slate-500"
                        : "bg-slate-600"
                    }`}
                    style={{
                      width: `${(1 / array.length) * 100}%`,
                    }}
                  >
                    <p className="">{term}</p>
                  </div>
                ))}
            </div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-auto">
              Position: {position}
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default OSForm;