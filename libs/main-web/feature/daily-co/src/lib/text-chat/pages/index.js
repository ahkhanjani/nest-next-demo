import Index from '../../basic-call/pages';
import getDemoProps from '../../shared/lib/demoProps';

export async function getStaticProps() {
  const defaultProps = getDemoProps();

  // Pass through domain as prop
  return {
    props: defaultProps,
  };
}

export default Index;
