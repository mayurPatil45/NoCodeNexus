import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";

// const openai = new OpenAI({
//     apiKey: import.meta.env.VITE_Open_AI_Key,
//     dangerouslyAllowBrowser: true
// });

const options = [
    { value: "mongodb", label: "MongoDB" },
    { value: "sql", label: "SQL" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mariadb", label: "MariaDB" },
    { value: "firebase", label: "Firebase" },
    { value: "prisma", label: "Prisma" },
    { value: "graphql", label: "GraphQL" },
    { value: "dynamodb", label: "DynamoDB" },
]


const DBQueryGenerator = () => {
    const [database, setDatabase] = useState("")
    const [query, setQuery] = useState("")

    const getDB = (selected) => {
        console.log(selected.value);
    }

    const getQuery = (e) => {
        console.log(e.target.value);
    }
    const generateQuery = async () => {
        try {
            let finalQuery = `Create a ${database} request to ${query.charAt(0).toLowerCase() + query.slice(1)}: `;
            console.log(finalQuery);


            const genAI = new GoogleGenerativeAI(
                import.meta.env.VITE_Gemini_Key
            );
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = finalQuery;

            const result = await model.generateContent(prompt);
            console.log(result.response.text());
        } catch (error) {
            console.error("Error generating query:", error);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-2xl space-y-8 rounded-lg bg-white p-8 shadow-lg">
                <h1 className="text-center text-3xl font-bold text-gray-900">
                    Database Query Generator
                </h1>

                <div className="space-y-6">
                    <Select onValueChange={setDatabase} value={database}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Your Database..." />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter your Database Query.
  
  For Example, find all users who live in California and have over 1000 credits..."
                        className="min-h-32"
                    />

                    <button
                        onClick={generateQuery}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Generate Query
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DBQueryGenerator