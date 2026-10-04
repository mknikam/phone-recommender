import Questionnaire from "@/components/Questionnaire";
import { phones } from "@/data/phones";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-slate-900">
            Find Your Perfect Phone
          </h1>
          <p className="text-lg text-slate-600">
            Answer a few quick questions and we'll recommend the best smartphone for you.
          </p>
        </header>

        <Questionnaire phones={phones} />
      </div>
    </main>
  );
}
