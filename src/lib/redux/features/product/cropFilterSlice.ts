import { crops, ICrops } from "@/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";

export type ISearchFilter = Omit<IFilterOptions, 'cropVariety' | 'additionalServices'> & {
    cropVariety: string[];
    additionalServices: (keyof IFilterOptions["additionalServices"])[];
};

export interface IFilterOptions {
    priceRange: { min: number; max: number; };
    quantityRange: { min: number; max: number; };
    harvestDate: { from: string; to: string; };
    listedDate: { from: string; to: string; };
    additionalServices: { liveStreaming: boolean; sampleRequest: boolean; };
    grading: boolean;
    cropVariety: { [crop: string]: string[]; };
    filterOptions: ISearchFilter;
}

const initialState: IFilterOptions = {
    priceRange: { min: 0, max: 2000 },
    quantityRange: { min: 0, max: 1000 },
    harvestDate: { from: "", to: "" },
    listedDate: { from: "", to: "" },
    additionalServices: { liveStreaming: false, sampleRequest: false },
    grading: false,
    cropVariety: Object.keys(crops).reduce((acc, crop) => {
        acc[crop] = [];
        return acc;
    }, {} as { [crop: string]: string[]; }),
    filterOptions: {} as ISearchFilter,
};

const cropFilterSlice = createSlice({
    name: "cropFilters",
    initialState,
    reducers: {
        setPriceRange: (state, action: PayloadAction<IFilterOptions["priceRange"]>) => {
            state.priceRange = action.payload;
            updateFilterOptions(state);
        },
        setQuantityRange: (state, action: PayloadAction<IFilterOptions["quantityRange"]>) => {
            state.quantityRange = action.payload;
            updateFilterOptions(state);
        },
        setHarvestDate: (state, action: PayloadAction<IFilterOptions["harvestDate"]>) => {
            state.harvestDate = action.payload;
            updateFilterOptions(state);
        },
        setListedDate: (state, action: PayloadAction<IFilterOptions["listedDate"]>) => {
            state.listedDate = action.payload;
            updateFilterOptions(state);
        },
        setAdditionalServices: (state, action: PayloadAction<keyof IFilterOptions["additionalServices"]>) => {
            state.additionalServices[action.payload] = !state.additionalServices[action.payload];
            updateFilterOptions(state);
        },
        setGrading: (state, action: PayloadAction<boolean>) => {
            state.grading = action.payload;
            updateFilterOptions(state);
        },
        setCropVariety: (state, action: PayloadAction<{ crop: keyof typeof crops; deleted?: boolean; }>) => {
            const { crop, deleted } = action.payload;
            state.cropVariety[crop] = deleted ? [] : crops[crop];
            updateFilterOptions(state);
        },
        updateCropVariety: (state, action: PayloadAction<{ crop: string; variety: string }>) => {
            const { crop, variety } = action.payload;
            const index = state.cropVariety[crop].indexOf(variety);
            if (index === -1) {
                state.cropVariety[crop].push(variety);
            } else {
                state.cropVariety[crop].splice(index, 1);
            }
            updateFilterOptions(state);
        },
        removeCropVariety: (state, action: PayloadAction<string>) => {
            const crop = action.payload;
            if (crop in state.cropVariety) {
                state.cropVariety[crop] = [];
            } else {
                (Object.keys(state.cropVariety) as ICrops[]).forEach((key) => {
                    if (state.cropVariety[key].includes(crop)) {
                        state.cropVariety[key].splice(state.cropVariety[key].indexOf(crop), 1);
                    }
                });
            }
            updateFilterOptions(state);
        }

    }
});

export const cropFilterActions = cropFilterSlice.actions;
export const cropFilterReducer = cropFilterSlice.reducer;

// Get search params and update crop filter options
export const setFilterOptions = (filterOptions: Partial<ISearchFilter>) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { additionalServices, cropVariety, grading, harvestDate, listedDate, priceRange, quantityRange } = filterOptions;

    if (priceRange) dispatch(cropFilterActions.setPriceRange(priceRange));
    if (quantityRange) dispatch(cropFilterActions.setQuantityRange(quantityRange));
    if (harvestDate) dispatch(cropFilterActions.setHarvestDate(harvestDate));
    if (listedDate) dispatch(cropFilterActions.setListedDate(listedDate));

    additionalServices?.forEach((service) => {
        dispatch(cropFilterActions.setAdditionalServices(service as keyof IFilterOptions["additionalServices"]));
    });

    if (grading) dispatch(cropFilterActions.setGrading(grading));
    cropVariety?.forEach((item: string) => {
        if (item in crops) {
            dispatch(cropFilterActions.setCropVariety({ crop: item as keyof typeof crops }))
        } else {
            (Object.keys(crops) as ICrops[]).forEach((crop) => {
                if (crops[crop].includes(item) && getState().cropFilters.cropVariety[crop].indexOf(item) === -1) {
                    dispatch(cropFilterActions.updateCropVariety({ crop: crop, variety: item }))
                }
            })
        }
    });
}

//Update filter options for search params
const updateFilterOptions = (state: IFilterOptions) => {
    const { additionalServices, priceRange, quantityRange, harvestDate, listedDate, cropVariety } = state;

    const filterOptions = (Object.keys(state)).reduce((acc, key) => {
        switch (key) {
            case 'additionalServices':
                const services = Object.keys(additionalServices).filter((service) => additionalServices[service as keyof typeof additionalServices]);
                if (services.length) {
                    acc[key] = services;
                }
                break;
            case 'priceRange':
                if (priceRange.min !== 0 || priceRange.max !== 2000) {
                    acc[key] = priceRange;
                }
                break;
            case 'quantityRange':
                if (quantityRange.min !== 0 || quantityRange.max !== 1000) {
                    acc[key] = quantityRange;
                }
                break;
            case 'harvestDate':
                if (harvestDate.from && harvestDate.to) {
                    acc[key] = harvestDate;
                }
                break;
            case 'listedDate':
                if (listedDate.from && listedDate.to) {
                    acc[key] = listedDate;
                }
                break;
            case 'cropVariety':
                let varietyList = Object.keys(cropVariety).reduce((acc, crop) => {
                    if (cropVariety[crop].length === crops[crop as ICrops].length) {
                        acc.push(crop);
                    } else {
                        cropVariety[crop].forEach((item) => {
                            acc.push(item);
                        });
                    }
                    return acc;
                }, [] as string[]);
                if (varietyList.length) {
                    acc[key] = varietyList;
                }
            default:
                break;
        }
        return acc;
    }, {} as any);

    state.filterOptions = filterOptions;
}