
import GameState from './_components/GameState';
import getCurrentUser from '../actions/getCurrentUser';

const Game = async () => {
  const currentUser = await getCurrentUser(); 
  
  return (
    <div>
        <GameState
          currentUser = { JSON.stringify(currentUser) }
        /> 
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default Game;
