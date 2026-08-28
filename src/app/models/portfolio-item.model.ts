export interface PortfolioItem {
  /** Router link (relative to root), e.g. 'webdesign' */
  link: string;
  /** Image shown in the home page portfolio grid */
  image: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
  /** Small label above the image (tool used) */
  info: string;
  title: string;
  /** Layout hints copied from the original markup so the grid keeps its
   *  alternating horizontal/vertical, left/right rhythm */
  orientation: 'horizontal' | 'vertical';
  align: 'left' | 'right';
  justify: 'start' | 'center' | 'end';
  colClass: string;
}

export interface PortfolioOption {
  label: string;
  value: string;
}
