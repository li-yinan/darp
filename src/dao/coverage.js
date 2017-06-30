import {Coverage} from '../conf/db';
import {maxMerge} from '../util/index';

export async function save({data, path, title, domain}) {
    let mergedCoverage = await findMergedCoverage();
    if (mergedCoverage) {
        // 如果以前有merge过的，就继续merge
        // Object.assign(mergedCoverage, data);
        maxMerge(data, mergedCoverage);
        await updateMergedCoverage(mergedCoverage);
    }
    else {
        // 没有就存一个
        await Coverage.create({
            isMerged: true,
            data: JSON.stringify(data),
            title,
            domain,
            path
        });
    }

    return Coverage.create({
        data: JSON.stringify(data),
        title,
        domain,
        path
    });
}

export async function findMergedCoverage() {
    let mergedCoverages = await Coverage.findAll({
        where: {
            isMerged: true
        }
    });
    if (mergedCoverages.length) {
        return JSON.parse(mergedCoverages[0].data);
    }
    else {
        return null;
    }
}

export function updateMergedCoverage(data) {
    Coverage.update({
        data: JSON.stringify(data)
    }, {
        field: ['data'],
        where: {
            isMerged: true
        }
    });
}
