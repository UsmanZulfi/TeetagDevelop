import Rule from "@/website/components/Rule/Rule";

interface Props {
  rules: {
    num: number;
    shadowColor: string;
    title: string;
    text: string;
  }[];
}

export default function Rules({ rules }: Props) {
  return (
    <section
      className="section"
      style={{ paddingTop: "30px", paddingBottom: "50px" }}
    >
      <div className="container">
        <h1 className="text-center uppercase h1 shadow-heading font-fugaz">
          LET THE TAGGING BEGIN...
        </h1>
        <div className="grid grid-cols-1 gap-x-20 gap-y-32 lg:gap-x-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20 mr-7">
          {rules.map((rule) => (
            <Rule
              key={rule.num}
              num={rule.num}
              shadowColor={rule.shadowColor}
              title={rule.title}
              text={rule.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
