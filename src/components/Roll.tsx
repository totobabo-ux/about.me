/** 호버 시 위로 굴러가며 바뀌는 텍스트 */
export function Roll({ children, hover }: { children: string; hover?: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{hover ?? children}</span>
    </span>
  );
}
