import { useState } from 'react';
import RecordExercise from './RecordExercise';
import uniqid from 'uniqid';
import { useAuth } from '../../utils/AuthProvider';
import CreateExercise from './CreateExercise';
import { useUser } from '../../utils/UserProvider';
import { useTheme } from '../../utils/ThemeProvider';
import { kgToLb, lbToKg } from '../../utils/fnSheet/utilities';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
const apiURL = import.meta.env.VITE_LOCAL_API_URL;
function Record() {
  const theme = useTheme().theme;
  const userId = useAuth()!.user!.id;
  const userUnit = useUser()!.preferences.unit;
  const [creatingExercise, setCreatingExercise] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exerciseData, setExerciseData] = useState<
    {
      exercise: {
        id: string;
        muscleGroupsId: string;
        name: string;
        reps?: number | undefined;
        sets?: number | undefined;
        standardized: boolean;
      };
      performedWorkout: string;
      user: string;
      sets: {
        reps?: number;
        weight?: number;
        weightUnits?: { kg?: number; lb?: number };
        unit: 'kg' | 'lb';
        logged: boolean;
      }[];
    }[]
  >([
    {
      exercise: {
        id: '',
        muscleGroupsId: '',
        name: '',
        reps: undefined,
        sets: undefined,
        standardized: false,
      },
      performedWorkout: '844dfd43-7360-45a3-a6f9-14c5e663df05',
      user: userId,
      sets: [
        {
          reps: undefined,
          weight: undefined,
          weightUnits: { kg: undefined, lb: undefined },
          unit: userUnit,
          logged: false,
        },
      ],
    },
  ]);

  const handleExerciseId = (
    exercise: {
      id: string;
      muscleGroupsId: string;
      name: string;
      reps?: number | undefined;
      sets?: number | undefined;
      standardized: boolean;
    },
    index: number
  ) => {
    let previousState = [...exerciseData];
    previousState[index].exercise = exercise;
    setExerciseData(previousState);
  };
  const handleUpdateSets = (
    index: number,
    i: number,
    set: {
      reps?: number;
      weight?: number;
      weightUnits?: { kg?: number; lb?: number };
      unit: 'kg' | 'lb';
      logged: boolean;
    }
  ) => {
    let previousState = [...exerciseData];

    if (!previousState[index].sets[i]) {
      // add new set
      previousState[index].sets.push(set);
    } else {
      // edit existing set
      previousState[index].sets[i] = set;
    }
    // set sets

    setExerciseData(previousState);
  };
  const submitExercises = async () => {
    const submitData = async (data: {
      exercise: string;
      performedWorkout: string;
      user: string;
      sets: {
        index: number;
        reps?: number;
        weight?: number | undefined;
        weightUnits?: { kg?: number | undefined; lb?: number | undefined };
        unit: 'kg' | 'lb';
      }[];
    }) => {
      const res = await fetch(`${apiURL}api/performedExercises`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result) setIsSubmitting(false);
      return result.performedExercise;
    };

    const promiseArr = () => {
      let arr = [];
      for (let i = 0; i < exerciseData.length; i++) {
        if (exerciseData[i].exercise.id && exerciseData[i].user) {
          let data: {
            exercise: string;
            performedWorkout: string;
            user: string;
            sets: {
              index: number;
              reps?: number;
              weight?: number;
              weightUnits?: { kg?: number; lb?: number };
              unit: 'kg' | 'lb';
            }[];
          } = {
            exercise: exerciseData[i].exercise.id,
            user: exerciseData[i].user,
            performedWorkout: exerciseData[i].performedWorkout,
            sets: [],
          };
          for (let j = 0; j < exerciseData[i].sets.length; j++) {
            if (exerciseData[i].sets[j].logged) {
              data.sets.push({
                index: j,
                reps: exerciseData[i].sets[j].reps,
                weight: exerciseData[i].sets[j].weight,
                weightUnits: {
                  kg:
                    userUnit === 'kg'
                      ? exerciseData[i].sets[j].weight
                      : lbToKg(exerciseData[i].sets[j].weight || 0),
                  lb:
                    userUnit === 'lb'
                      ? exerciseData[i].sets[j].weight
                      : kgToLb(exerciseData[i].sets[j].weight || 0),
                },
                unit: exerciseData[i].sets[j].unit,
              });
            }
          }
          arr.push(submitData(data));
        }
      }
      return arr;
    };
    Promise.all(promiseArr()).then((value) => {
      setExerciseData([
        {
          exercise: {
            id: '',
            muscleGroupsId: '',
            name: '',
            reps: undefined,
            sets: undefined,
            standardized: false,
          },
          performedWorkout: '844dfd43-7360-45a3-a6f9-14c5e663df05',
          user: userId,
          sets: [
            {
              reps: undefined,
              weight: undefined,
              unit: userUnit,
              logged: false,
            },
          ],
        },
      ]);
    });
    // IF submission is successful then the promise should make a quick message popup and refresh the forms
  };
  return (
    <div className='flex flex-col w-screen lg:w-[calc(100vw-20rem)] min-h-[calc(100%-6rem)] sm:p-2 gap-2'>
      <div className='dark:bg-[rgb(35,35,35)] shadow-md p-4 pt-2 flex gap-2 flex-col rounded-md'>
        <h1>Record Exercise</h1>
        <span className='flex flex-wrap justify-between'>
          <span
            onClick={() => {
              setExerciseData((prev) => [
                ...prev,
                {
                  exercise: {
                    id: '',
                    muscleGroupsId: '',
                    name: '',
                    reps: undefined,
                    sets: undefined,
                    standardized: false,
                  },
                  performedWorkout: '844dfd43-7360-45a3-a6f9-14c5e663df05',
                  user: userId,
                  sets: [
                    {
                      reps: undefined,
                      weight: undefined,
                      unit: userUnit,
                      logged: false,
                    },
                  ],
                },
              ]);
            }}
            className='bg-slate-300 dark:bg-[rgb(60,60,60)] rounded-md p-2 w-fit flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-slate-200'
          >
            <span className='flex gap-1'>
              <h6>Add </h6>
              <h6 className='hidden sm:flex'> New </h6>
              <h6>Exercise</h6>
            </span>
            <img
              className='h-8'
              src={
                theme === 'dark'
                  ? '/favicons/new-white.svg'
                  : '/favicons/new.svg'
              }
              alt='new exercise button'
            />
          </span>
          <button
            className='bg-slate-400 dark:bg-[rgb(60,60,60)] pl-4 pr-4 rounded-md hover:bg-blue-20'
            onClick={() => {
              setIsSubmitting(true);
              submitExercises();
            }}
          >
            {isSubmitting ? (
              <TailSpin className='h-6' stroke={'#FFFFFF'} />
            ) : (
              'Submit'
            )}
          </button>
        </span>
      </div>
      <div className='relative flex flex-wrap gap-5 justify-center items-start'>
        {creatingExercise && (
          <CreateExercise setCreatingExercise={setCreatingExercise} />
        )}
        {exerciseData.map((data, i) => (
          <RecordExercise
            setCreatingExercise={setCreatingExercise}
            index={i}
            data={data}
            key={uniqid()}
            handleExerciseId={handleExerciseId}
            handleSets={handleUpdateSets}
          />
        ))}
      </div>
    </div>
  );
}

export default Record;
