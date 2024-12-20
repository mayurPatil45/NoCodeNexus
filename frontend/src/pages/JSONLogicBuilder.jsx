import { useState, useCallback } from 'react';
import { Check, CopyIcon } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Code, FolderPlus } from 'lucide-react';
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

const JSONLogicBuilder = () => {
  const [copied, setCopied] = useState({ sql: false, json: false });
  
  const copyToClipboard = useCallback(async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(prev => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopied(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);
  const [conditions, setConditions] = useState([
    { id: 1, type: 'AND', rules: [{ field: '', operator: '=', value: '' }] }
  ]);

  const operators = ['AND', 'OR', 'NOT'];
  const comparisons = ['=', '!=', '>', '<', '>=', '<='];

  const addCondition = (parentId = null) => {
    const newCondition = {
      id: Date.now(),
      type: 'AND',
      rules: [{ field: '', operator: '=', value: '' }]
    };

    if (parentId === null) {
      setConditions([...conditions, newCondition]);
    } else {
      const updateConditions = (items) => {
        return items.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              rules: [...item.rules, newCondition]
            };
          }
          if (item.rules?.some(rule => typeof rule === 'object' && rule.id)) {
            return {
              ...item,
              rules: updateConditions(item.rules)
            };
          }
          return item;
        });
      };

      setConditions(updateConditions(conditions));
    }
  };

  const removeCondition = (id) => {
    const removeFromArray = (items) => {
      return items.filter(item => {
        if (item.id === id) return false;
        if (item.rules?.some(rule => typeof rule === 'object' && rule.id)) {
          item.rules = removeFromArray(item.rules);
        }
        return true;
      });
    };

    setConditions(removeFromArray(conditions));
  };

  const updateCondition = (id, field, value) => {
    const updateInArray = (items) => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        if (item.rules?.some(rule => typeof rule === 'object' && rule.id)) {
          return {
            ...item,
            rules: updateInArray(item.rules)
          };
        }
        return item;
      });
    };

    setConditions(updateInArray(conditions));
  };

  const deleteRule = (conditionId, ruleIndex) => {
    setConditions(prev => {
      const updateInArray = (items) => {
        return items.map(item => {
          if (item.id === conditionId) {
            // Ensure we keep at least one rule
            if (item.rules.length <= 1) {
              return item;
            }
            const newRules = item.rules.filter((_, index) => index !== ruleIndex);
            return { ...item, rules: newRules };
          }
          if (item.rules?.some(rule => typeof rule === 'object' && rule.id)) {
            return {
              ...item,
              rules: updateInArray(item.rules)
            };
          }
          return item;
        });
      };
      return updateInArray(prev);
    });
  };

  const addRule = (conditionId) => {
    setConditions(prev => {
      const updateInArray = (items) => {
        return items.map(item => {
          if (item.id === conditionId) {
            return {
              ...item,
              rules: [...item.rules, { field: '', operator: '=', value: '' }]
            };
          }
          if (item.rules?.some(rule => typeof rule === 'object' && rule.id)) {
            return {
              ...item,
              rules: updateInArray(item.rules)
            };
          }
          return item;
        });
      };
      return updateInArray(prev);
    });
  };

  const updateRule = (conditionId, index, field, value) => {
    const updateInArray = (items) => {
      return items.map(item => {
        if (item.id === conditionId) {
          const newRules = [...item.rules];
          newRules[index] = { ...newRules[index], [field]: value };
          return { ...item, rules: newRules };
        }
        if (item.rules?.some(rule => typeof rule === 'object' && rule.id)) {
          return {
            ...item,
            rules: updateInArray(item.rules)
          };
        }
        return item;
      });
    };

    setConditions(updateInArray(conditions));
  };

  const generateSQLQuery = (conditions) => {
    const buildSQL = (condition) => {
      if (!condition.rules || condition.rules.length === 0) return '';

      const rules = condition.rules.map(rule => {
        if (rule.id) {
          return buildSQL(rule);
        }
        return `${rule.field} ${rule.operator} '${rule.value}'`;
      }).filter(rule => rule);

      if (rules.length === 0) return '';

      if (condition.type === 'NOT') {
        return `NOT (${rules.join(` ${condition.type} `)})`;
      }

      return `(${rules.join(` ${condition.type} `)})`;
    };

    return buildSQL({ type: 'AND', rules: conditions });
  };

  const generateJsonLogic = (conditions) => {
    const buildJson = (condition) => {
      if (!condition.rules || condition.rules.length === 0) return {};

      const rules = condition.rules
        .map(rule => {
          if (rule.id) {
            return buildJson(rule);
          }
          return {
            [rule.operator]: [
              { var: rule.field },
              rule.value
            ]
          };
        })
        .filter(rule => Object.keys(rule).length > 0);

      if (rules.length === 0) return {};

      if (condition.type === 'NOT') {
        return { 'not': rules[0] };
      }

      return { [condition.type.toLowerCase()]: rules };
    };

    return buildJson({ type: 'AND', rules: conditions });
  };

  const addNestedCondition = (parentId) => {
    const newCondition = {
      id: Date.now(),
      type: 'AND',
      rules: [{ field: '', operator: '=', value: '' }]
    };

    setConditions(prev => {
      const updateConditions = (items) => {
        return items.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              rules: [...item.rules, newCondition]
            };
          }
          if (item.rules?.some(rule => typeof rule === 'object' && rule.id)) {
            return {
              ...item,
              rules: updateConditions(item.rules)
            };
          }
          return item;
        });
      };
      return updateConditions(prev);
    });
  };

  const renderCondition = (condition, level = 0) => {
    return (
      <div key={condition.id} className={`pl-4 border-l-2 ${level % 2 === 0 ? 'border-blue-200' : 'border-green-200'} mt-2`}>
        <div className="flex items-center gap-2 mb-2">
          <Select
            value={condition.type}
            onValueChange={(value) => updateCondition(condition.id, 'type', value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue>{condition.type}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {operators.map(op => (
                <SelectItem key={op} value={op}>{op}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => addRule(condition.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Field</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => addNestedCondition(condition.id)}
                >
                  <FolderPlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Nested Group</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {level > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeCondition(condition.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Group</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {condition.rules.map((rule, index) => (
          <div key={rule.id || index} className="ml-4 mb-2">
            {rule.id ? (
              renderCondition(rule, level + 1)
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    placeholder="Field"
                    value={rule.field}
                    onChange={(e) => updateRule(condition.id, index, 'field', e.target.value)}
                    className="w-32"
                  />
                  <Select
                    value={rule.operator}
                    onValueChange={(value) => updateRule(condition.id, index, 'operator', value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue>{rule.operator}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {comparisons.map(op => (
                        <SelectItem key={op} value={op}>{op}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Value"
                    value={rule.value}
                    onChange={(e) => updateRule(condition.id, index, 'value', e.target.value)}
                    className="w-32"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteRule(condition.id, index)}
                          disabled={condition.rules.length <= 1}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Field</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Logic Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conditions.map(condition => renderCondition(condition))}
            <Button
              variant="outline"
              onClick={() => addCondition()}
              className="mt-4"
            >
              Add Group
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Outputs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Alert>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <AlertTitle className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      SQL Query
                    </AlertTitle>
                    <Textarea
                      readOnly
                      value={generateSQLQuery(conditions)}
                      className="mt-2 font-mono text-sm bg-secondary/50"
                    />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(generateSQLQuery(conditions), 'sql')}
                        >
                          {copied.sql ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied.sql ? 'Copied!' : 'Copy SQL'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Alert>
            </div>

            <div className="relative">
              <Alert>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <AlertTitle className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      JSON Logic Format
                    </AlertTitle>
                    <Textarea
                      readOnly
                      value={JSON.stringify(generateJsonLogic(conditions), null, 2)}
                      className="mt-2 font-mono text-sm bg-secondary/50 min-h-[200px]"
                    />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(JSON.stringify(generateJsonLogic(conditions), null, 2), 'json')}
                        >
                          {copied.json ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied.json ? 'Copied!' : 'Copy JSON'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JSONLogicBuilder;