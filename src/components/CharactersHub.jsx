import Avatar from '../components/Avatar';
import Ring from '../components/Ring';
export default function CharactersHub() {
  // To have functional img in Localhost switch to "/src/assets/nameoffile.png"
  return (
    <>
      <div className="max-w-fit max-h-fit flex gap-4 p-2 absolute top-0 right-96 z-20">
        <Ring characterName="Batman">
          <Avatar src="/batman.png" />
        </Ring>
        <Ring characterName="Gladys">
          <Avatar src="/gladys.png" />
        </Ring>
        <Ring characterName="Grievious">
          {' '}
          <Avatar src="/grievious.png" />
        </Ring>
        <Ring characterName="Mr.Book">
          {' '}
          <Avatar src="/mrbook.png" />
        </Ring>
      </div>
    </>
  );
}
