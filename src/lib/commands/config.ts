import { CONTEXT } from '../context';

const config = () => {
  const cfg = CONTEXT.config;

  if (cfg) {
    const paths: string[] = [];

    Object.entries(cfg.parents).forEach(([_, value]) => {
      paths.push(value.path);
    });

    printList(paths, 'parents');
  }

  process.exit();
};

function printList(arr: any[], header?: string) {
  if (!arr.length) {
    return;
  }

  console.log('\n');

  if (header) {
    console.log(`[${header}]`);
  }

  arr.forEach((i) => {
    console.log(i);
  });
}

export default config;
