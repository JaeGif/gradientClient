import RadarLevels from '../../charts/RadarLevels';
const units = 'kg';
import { standards } from '../../../data/standards';
import { useAuth } from '../../../utils/AuthProvider';
function GeneralProgressChart() {
  // use max values from last 30 days on standard exercises as the users current values
  // standards can be added programmatically from the DB
  const userGender = useAuth()!.user!.gender;
  const genderedStandards = standards.gender[userGender];

  // bench, pullup, squat, deadlift, shoulder press
  return (
    <div className='debug w-2/3 rounded-lg p-2 min-w-[420px]'>
      <RadarLevels
        exerciseLevels={{
          beginner: [
            genderedStandards[0].level.beginner.weight[units],
            genderedStandards[1].level.beginner.weight[units],
            genderedStandards[2].level.beginner.weight[units],
            genderedStandards[3].level.beginner.weight[units],
            genderedStandards[4].level.beginner.weight[units],
          ],
          novice: [
            genderedStandards[0].level.novice.weight[units],
            genderedStandards[1].level.novice.weight[units],
            genderedStandards[2].level.novice.weight[units],
            genderedStandards[3].level.novice.weight[units],
            genderedStandards[4].level.novice.weight[units],
          ],
          intermediate: [
            genderedStandards[0].level.intermediate.weight[units],
            genderedStandards[1].level.intermediate.weight[units],
            genderedStandards[2].level.intermediate.weight[units],
            genderedStandards[3].level.intermediate.weight[units],
            genderedStandards[4].level.intermediate.weight[units],
          ],
          advanced: [
            genderedStandards[0].level.advanced.weight[units],
            genderedStandards[1].level.advanced.weight[units],
            genderedStandards[2].level.advanced.weight[units],
            genderedStandards[3].level.advanced.weight[units],
            genderedStandards[4].level.advanced.weight[units],
          ],
          elite: [
            genderedStandards[0].level.elite.weight[units],
            genderedStandards[1].level.elite.weight[units],
            genderedStandards[2].level.elite.weight[units],
            genderedStandards[3].level.elite.weight[units],
            genderedStandards[4].level.elite.weight[units],
          ],
        }}
        userExerciseLevels={[
          { exercise: 'Bench', value: 100 },
          { exercise: 'Pullups', value: 30 },
          { exercise: 'Squat', value: 150 },
          { exercise: 'Deadlift', value: 100 },
          { exercise: 'Shoulder Press', value: 59 },
        ]}
      />
    </div>
  );
}

export default GeneralProgressChart;
