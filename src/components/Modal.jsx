import { useGameContext } from '../GameContext';

export default function Modal({ textChoice }) {
  const { startModal, setStartModal, endModal, setEndModal } = useGameContext();

  const ErrText = 'An error occured. Please try again later.';
  textChoice === 'error' ? textChoice === ErrText : textChoice;

  return (
    <>
      <dialog
        id="my_modal_1"
        className="modal z-10"
        open
      >
        <div className="modal-box max-w-[400px] text-center bg-slate-600 p-2 text-slate-200">
          <h3 className="font-bold text-lg">A Where's Waldo game </h3>
          <p className="py-4">
            {' '}
            {textChoice === 'start'
              ? 'The rules are simple: Once you will have clicked on the Play button, a timer will be set on. You will need to be as quick as possible to find the 4 characters displayed on the top-right of the picture. Once your done, you can see your time. If you want to save your score, you will need an Google Account. Enjoy'
              : 'Congratulations ! You have finished ! Click to log/sign-in and see the leaderboard !'}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 btn"
                onClick={() => {
                  startModal
                    ? setStartModal((prevState) => !prevState)
                    : setEndModal((prevState) => !prevState);
                }}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
