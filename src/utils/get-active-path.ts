import {closest} from 'fastest-levenshtein';

export const getActivePath = (path: string, paths: Array<string>, ignorePaths?: Array<string>) => {
    const closestPath = closest(path, paths.concat(ignorePaths || []));
    const index = paths.indexOf(closestPath);

    return {active: closestPath, activeIndex: index};
}