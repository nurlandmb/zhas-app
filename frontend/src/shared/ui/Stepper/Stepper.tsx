import {classNames} from 'shared/lib/classNames/classNames.ts';
import cls from './Stepper.module.scss';
import {ReactElement} from 'react';
export interface StepperStep {
    icon: ReactElement;
}

interface StepperProps {
    steps: StepperStep[];
    currentStep: number;
    className?: string;
}

const Stepper = ({steps, className, currentStep}: StepperProps) => {
    const getClsMods = (step: StepperStep, index: number) => {
        return {
            [cls.line]: index + 1 < steps.length,
            [cls.active]: currentStep >= index,
        }
    }
    return (
        <ol className="flex items-center w-full">
            {
                steps.map((step, i) => (
                    <li key={i} className={classNames("flex w-full items-center", getClsMods(step, i), [className])}>
                        <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                            {step.icon}
                        </span>
                    </li>
                ) )
            }


        </ol>
    )
};

export default Stepper;