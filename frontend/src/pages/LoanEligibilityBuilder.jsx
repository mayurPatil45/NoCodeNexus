import { useState, useRef, useCallback, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Trash2, Plus } from 'lucide-react';
import * as d3 from 'd3';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

const LoanEligibilityBuilder = () => {
    // Toast hook
    const { toast } = useToast();

    // JSON Upload State
    const [jsonLogic, setJsonLogic] = useState(null);
    const [uploadMode, setUploadMode] = useState(true);
    const [creationName, setCreationName] = useState('');
    const fileInputRef = useRef(null);

    // Existing state from previous implementation
    const [activeTab, setActiveTab] = useState("upload");

    // Rules State Management
    const [rules, setRules] = useState([
        {
            id: 1,
            field: 'credit_score',
            condition: '>=',
            value: '700',
            description: 'Minimum credit score requirement'
        }
    ]);

    // Decisions State Management
    const [decisions, setDecisions] = useState([
        {
            id: 1,
            ruleCombination: 'AND',
            rules: [1],
            action: 'APPROVE',
            priority: 1
        }
    ]);

    // Validate State Management
    const [validateData, setValidateData] = useState({
        creditScore: '',
        monthlyIncome: '',
        employmentStatus: '',
        loanAmount: ''
    });

    // Generated Code State
    const [generatedCode, setGeneratedCode] = useState('');

    // Visualization State
    const [graphData, setGraphData] = useState({
        nodes: [],
        links: []
    });

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parsedJson = JSON.parse(e.target.result);
                    setJsonLogic(parsedJson);
                    processJsonForVisualization(parsedJson);
                    setActiveTab("rules");
                    toast({
                        title: "JSON Uploaded Successfully",
                        description: "Your logic has been parsed and is ready to use."
                    });
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    toast({
                        title: "Error",
                        description: "Invalid JSON file",
                        variant: "destructive"
                    });
                }
            };
            reader.readAsText(file);
        }
    };

    // Process JSON for visualization
    const processJsonForVisualization = (json) => {
        const nodes = [];
        const links = [];

        const processNode = (node, parentId = null, depth = 0) => {
            const nodeId = nodes.length;
            nodes.push({
                id: nodeId,
                name: typeof node === 'object' ? JSON.stringify(node) : node.toString(),
                depth
            });

            // Create link from parent to this node
            if (parentId !== null) {
                links.push({
                    source: parentId,
                    target: nodeId
                });
            }

            // Recursively process child nodes
            if (typeof node === 'object') {
                Object.values(node).forEach(child => {
                    if (child !== null && (typeof child === 'object' || Array.isArray(child))) {
                        processNode(child, nodeId, depth + 1);
                    }
                });
            }
        };

        processNode(json);

        setGraphData({ nodes, links });
    };

    // Render Logic Graph Visualization
    const renderLogicGraph = () => (
        <Card>
            <CardHeader>
                <CardTitle>Logic Graph Visualization</CardTitle>
            </CardHeader>
            <CardContent>
                <div id="logic-graph" className="w-full h-[400px] border rounded"></div>
            </CardContent>
        </Card>
    );

    // Render Upload/Create Section
    const renderUploadCreate = () => (
        <Card>
            <CardHeader>
                <CardTitle>JSON Logic Setup</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4">
                    <Button
                        variant={uploadMode ? 'default' : 'outline'}
                        onClick={() => setUploadMode(true)}
                    >
                        <Upload className="mr-2 h-4 w-4" /> Upload
                    </Button>
                    <Button
                        variant={!uploadMode ? 'default' : 'outline'}
                        onClick={() => setUploadMode(false)}
                    >
                        <FileText className="mr-2 h-4 w-4" /> Create
                    </Button>
                </div>

                {uploadMode ? (
                    <div className="mt-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".json"
                            className="hidden"
                        />
                        <Button onClick={() => fileInputRef.current.click()}>
                            <Upload className="mr-2 h-4 w-4" /> Select JSON File
                        </Button>
                    </div>
                ) : (
                    <div className="mt-4 flex space-x-4">
                        <Input
                            placeholder="Enter a name for your logic"
                            value={creationName}
                            onChange={(e) => setCreationName(e.target.value)}
                        />
                        <Button>Create Logic</Button>
                    </div>
                )}

                {jsonLogic && (
                    <div className="mt-4">
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                            {JSON.stringify(jsonLogic, null, 2)}
                        </pre>
                    </div>
                )}
            </CardContent>
        </Card>
    );

    // Existing methods from previous implementation
    const addRule = useCallback(() => {
        const newRule = {
            id: rules.length ? Math.max(...rules.map(r => r.id)) + 1 : 1,
            field: 'credit_score',
            condition: '>=',
            value: '',
            description: ''
        };
        setRules([...rules, newRule]);
    }, [rules]);

    const removeRule = useCallback((id) => {
        setRules(rules.filter(rule => rule.id !== id));
    }, [rules]);

    const updateRule = useCallback((id, updates) => {
        setRules(rules.map(rule =>
            rule.id === id ? { ...rule, ...updates } : rule
        ));
    }, [rules]);

    // Render Rules Tab
    const renderRulesTab = () => (
        <Card>
            <CardHeader>
                <CardTitle>Loan Eligibility Rules</CardTitle>
                <Button variant="outline" onClick={addRule} className="self-end">
                    <Plus className="mr-2 h-4 w-4" /> Add Rule
                </Button>
            </CardHeader>
            <CardContent>
                {rules.map((rule) => (
                    <div key={rule.id} className="flex items-center space-x-2 mb-2">
                        <Select
                            value={rule.field}
                            onValueChange={(value) => updateRule(rule.id, { field: value })}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Field" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="credit_score">Credit Score</SelectItem>
                                <SelectItem value="monthly_income">Monthly Income</SelectItem>
                                <SelectItem value="employment_status">Employment Status</SelectItem>
                                <SelectItem value="loan_amount">Loan Amount</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={rule.condition}
                            onValueChange={(value) => updateRule(rule.id, { condition: value })}
                        >
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value=">=">{'>='}  </SelectItem>
                                <SelectItem value="<=">{'<='}  </SelectItem>
                                <SelectItem value="==">{'=='} </SelectItem>
                                <SelectItem value="!=">{'!='} </SelectItem>
                            </SelectContent>
                        </Select>

                        <Input
                            placeholder="Value"
                            value={rule.value}
                            onChange={(e) => updateRule(rule.id, { value: e.target.value })}
                            className="w-[100px]"
                        />

                        <Input
                            placeholder="Description"
                            value={rule.description}
                            onChange={(e) => updateRule(rule.id, { description: e.target.value })}
                            className="w-[200px]"
                        />

                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeRule(rule.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );

    // Render graph visualization on component mount
    useEffect(() => {
        if (graphData.nodes.length > 0) {
            const width = 800;
            const height = 400;

            // Clear any existing SVG
            d3.select('#logic-graph svg').remove();

            // Create SVG
            const svg = d3.select('#logic-graph')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            // Create simulation
            const simulation = d3.forceSimulation(graphData.nodes)
                .force('link', d3.forceLink(graphData.links).id(d => d.id))
                .force('charge', d3.forceManyBody().strength(-100))
                .force('center', d3.forceCenter(width / 2, height / 2));

            // Create links
            const link = svg.append('g')
                .selectAll('line')
                .data(graphData.links)
                .enter().append('line')
                .attr('stroke', '#999')
                .attr('stroke-opacity', 0.6)
                .attr('stroke-width', 2);

            // Create nodes
            const node = svg.append('g')
                .selectAll('circle')
                .data(graphData.nodes)
                .enter().append('circle')
                .attr('r', 5)
                .attr('fill', d => d3.interpolateBlues(d.depth / 10 + 0.3))
                .call(d3.drag()
                    .on('start', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on('drag', (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on('end', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    }));

            // Add labels
            const label = svg.append('g')
                .selectAll('text')
                .data(graphData.nodes)
                .enter().append('text')
                .text(d => d.name)
                .attr('font-size', 10)
                .attr('dx', 12)
                .attr('dy', 4);

            // Update positions
            simulation.on('tick', () => {
                link
                    .attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);

                node
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);

                label
                    .attr('x', d => d.x)
                    .attr('y', d => d.y);
            });
        }
    }, [graphData]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="upload">Upload/Create</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                    <TabsTrigger value="decisions">Decisions</TabsTrigger>
                    <TabsTrigger value="validate">Validate</TabsTrigger>
                    <TabsTrigger value="generate">Generate</TabsTrigger>
                </TabsList>
                <TabsContent value="upload">{renderUploadCreate()}</TabsContent>
                <TabsContent value="rules">{renderRulesTab()}</TabsContent>
                {/* Render other existing tabs similar to Rules tab */}
            </Tabs>
            {jsonLogic && renderLogicGraph()}
            <Toaster />
        </div>
    );
};

export default LoanEligibilityBuilder;